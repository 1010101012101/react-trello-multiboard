import React from 'react'
import { omit } from 'lodash'

// Syntax Highlighting
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/styles/hljs'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// Config & Components
import proptypes from './page-config.prop-types'
import Config from '../../config/config'

// Utils
import { regexStringifier } from '../utils/regex-stringify'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
})

const ConfigPage = props => (
  <Paper className={props.classes.root} elevation={4}>
    <Typography variant="headline" component="h1">
      Current Config
    </Typography>
    <SyntaxHighlighter language="javascript" style={docco}>
      {JSON.stringify(omit(Config, 'api_key'), regexStringifier, 2)}
    </SyntaxHighlighter>
  </Paper>
)

ConfigPage.displayName = 'ConfigPage'
ConfigPage.propTypes = proptypes

export default withStyles(styles)(ConfigPage)
