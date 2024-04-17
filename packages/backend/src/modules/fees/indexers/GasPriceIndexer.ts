import { CoingeckoQueryService, EtherscanClient } from '@l2beat/shared'
import { UnixTime } from '@l2beat/shared-pure'
import { mean } from 'lodash'

import {
  ManagedChildIndexer,
  ManagedChildIndexerOptions,
} from '../../../tools/uif/ManagedChildIndexer'
import { GasPriceRepository } from '../repositories/GasPriceRepository'
import { Fee, FeeAnalyzer } from '../types'

export interface GasPriceIndexerDeps extends ManagedChildIndexerOptions {
  coingeckoQueryService: CoingeckoQueryService
  gasPriceRepository: GasPriceRepository
  project: string
  blockTimestampClient: EtherscanClient
  analyzer: FeeAnalyzer
}

export class GasPriceIndexer extends ManagedChildIndexer {
  readonly indexerId: string

  constructor(private readonly $: GasPriceIndexerDeps) {
    super($)
    this.indexerId = $.id
  }

  async update(_from: number, _to: number): Promise<number> {
    const timestamp = new UnixTime(_from).toEndOf('hour')
    const d = await this.getGasPriceForTimestamp(timestamp)

    await this.$.gasPriceRepository.addOrUpdateMany([
      {
        timestamp,
        project: this.$.project,
        gasPriceGwei: d,
      },
    ])

    return timestamp.gt(new UnixTime(_to)) ? _to : timestamp.toNumber()
  }

  override async invalidate(targetHeight: number): Promise<number> {
    await this.$.gasPriceRepository.deleteAfter(
      this.$.project,
      new UnixTime(targetHeight),
    )

    return targetHeight
  }

  async getGasPriceForTimestamp(timestamp: UnixTime) {
    const fromBlock =
      await this.$.blockTimestampClient.getBlockNumberAtOrBefore(timestamp)
    const toBlock = await this.$.blockTimestampClient.getBlockNumberAtOrBefore(
      timestamp.add(1, 'hours'),
    )

    const blockDiff = toBlock - fromBlock
    const granularity = 6

    const d: Fee[] = []

    for (
      let i = fromBlock;
      i < toBlock;
      i += Math.floor(blockDiff / granularity)
    ) {
      const dd = await this.$.analyzer.getData(i)
      d.push(dd)
    }

    return mean(d.map((x) => x.avgFeePerGas))
  }
}