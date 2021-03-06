import Enzyme from 'enzyme' // eslint-disable-line
import Adapter from 'enzyme-adapter-react-16' // eslint-disable-line
import { invoke } from 'lodash'

// import icons
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faAlignLeft from '@fortawesome/fontawesome-free-solid/faAlignLeft'
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare'
import faCommentDots from '@fortawesome/fontawesome-free-solid/faCommentDots'
import faPaperclip from '@fortawesome/fontawesome-free-solid/faPaperclip'

// mock modules
jest.mock('./config/config')
jest.mock('./src/utils/google-analytics')

// other enzyme tools (not used yet)
// - https://github.com/FormidableLabs/enzyme-matchers
Enzyme.configure({ adapter: new Adapter() })

// make icons available in all tests
fontawesome.library.add(brands, faAlignLeft, faCheckSquare, faCommentDots, faPaperclip)

// mock $ (jquery)
window.$ = jest.fn()

// mock Trello
window.Trello = {
  get: jest.fn(() => Promise.resolve({})),
}

// mock browser's localStorage
global.localStorage = {
  removeItem: jest.fn(),
}

// mock trello's embed.min.js
window.TrelloCards = {
  create: jest.fn((cardId, cardSelector, options) => {
    // mock onloading and onresize events and results
    const evt = {
      path: [{ clientHeight: 100 }],
    }
    const dim = { height: 100 }

    // the timout simulates the time it needs to
    // call these features after the iframe has reloaded
    // or resized
    setTimeout(() => {
      invoke(options, 'onLoad', evt)
      invoke(options, 'onResize', dim)
    }, 1000)
  }),
  load: jest.fn(),
}

// as long as we do not have implemented a Markdown-Loader for Jest, we mock
// every markdown file here
jest.mock('./src/pages-content/privacy.md', () => 'Hello Privacy.md!')
