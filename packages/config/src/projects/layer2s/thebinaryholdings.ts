import { UnixTime } from '@l2beat/shared-pure'
import { ProjectDiscovery } from '../../discovery/ProjectDiscovery'
import { Badge } from '../badges'
import { opStackL2 } from './templates/opStack'
import { Layer2 } from './types'

const discovery = new ProjectDiscovery('thebinaryholdings')

export const thebinaryholdings: Layer2 = opStackL2({
  discovery,
  badges: [Badge.Infra.Superchain],
  display: {
    name: 'The Binary Holdings',
    slug: 'thebinaryholdings',
    shortName: 'Binary',
    warning:
      'Fraud proof system is currently under development. Users need to trust the block proposer to submit correct L1 state roots.',
    description:
      'The Binary Holdings is a web3 infrastructure that integrates into telecommunication and banking apps to increase user engagement, retention, and ARPU (Average Revenue Per User) - while rewarding users for their engagement. It uses its own token (BNRY) for gas.',
    purposes: ['Universal'],
    links: {
      websites: ['https://thebinaryholdings.com/'],
      apps: [],
      documentation: ['https://docs.thebinaryholdings.com/'],
      explorers: ['https://explorer.thebinaryholdings.com'],
      repositories: [],
      socialMedia: [
        'https://twitter.com/thebinaryhldgs',
        'https://t.me/tbhofficialchat',
        'https://discord.gg/wCXJmTBGr2',
      ],
    },
    activityDataSource: 'Blockchain RPC',
  },
  rpcUrl: 'https://rpc.zero.thebinaryholdings.com',
  genesisTimestamp: new UnixTime(1719397465),
  finality: {
    type: 'OPStack-blob',
    genesisTimestamp: new UnixTime(1719398651),
    minTimestamp: new UnixTime(1719397465),
    l2BlockTimeSeconds: 2,
    lag: 0,
    stateUpdate: 'disabled',
  },
  isNodeAvailable: 'UnderReview',
  milestones: [],
  usesBlobs: true,
  useDiscoveryMetaOnly: true,
  nonTemplateOptimismPortalEscrowTokens: [], // should add BNRY but the coingecko page doesn't report the ethereum address
})