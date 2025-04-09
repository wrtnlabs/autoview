import { Box, Divider, Link, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material"

export const MarkdownComponents = {
  // code
  code: ({ ...props }) => (
    <code
      style={{
        backgroundColor: 'rgba(126, 125, 124, 0.1)',
        borderRadius: '0.25rem',
        padding: '0.25rem 0.5rem',
      }}
    >
      {props.children}
    </code>
  ),

  // Divider
  hr: ({ ...props }) => (
    <Divider {...props} />
  ),

  // Headings
  h1: ({ ...props }) => (
    <Typography {...props} variant="h1" component="h1" />
  ),
  h2: ({ ...props }) => (
    <Typography {...props} variant="h2" component="h2" />
  ),
  h3: ({ ...props }) => (
    <Typography {...props} variant="h3" component="h3" />
  ),
  h4: ({ ...props }) => (
    <Typography {...props} variant="h4" component="h4" />
  ),
  h5: ({ ...props }) => (
    <Typography {...props} variant="h5" component="h5" />
  ),
  h6: ({ ...props }) => (
    <Typography {...props} variant="h6" component="h6" />
  ),

  // Image
  img: ({ ...props }) => (
    <img {...props} />
  ),

  // Link
  a: ({ ...props }) => (
    <Link {...props} />
  ),

  // List
  li: ({ ...props }) => (
    <Typography component="li" {...props} />
  ),
  ul: ({ ...props }) => (
    <Typography component="ul" {...props} />
  ),
  ol: ({ ...props }) => (
    <Typography component="ol" {...props} />
  ),

  // Table
  table: ({ ...props }) => (
    <TableContainer>
      <Table {...props} />
    </TableContainer>
  ),
  thead: ({ ...props }) => (
    <TableHead {...props} />
  ),
  tbody: ({ ...props }) => (
    <TableBody {...props} />
  ),
  tr: ({ ...props }) => (
    <TableRow {...props} />
  ),
  th: ({ ...props }) => (
    <TableCell {...props} />
  ),
  td: ({ ...props }) => (
    <TableCell {...props} />
  ),
  tfoot: ({ ...props }) => (
    <TableFooter {...props} />
  ),

  // Text
  p: ({ ...props }) => (
    <Box component='p' {...props} />
  ),
  span: ({ ...props }) => (
    <Typography component='span' {...props} />
  ),
  strong: ({ ...props }) => (
    <Box component='strong' {...props} />
  ),
  em: ({ ...props }) => (
    <Box component='em' {...props} />
  ),
  blockquote: ({ ...props }) => (
    <Box
      component='blockquote'
      sx={{
        borderInlineStart: '2px solid',
        paddingInlineStart: '16px',
        m: '0.25rem 0',
        borderColor: 'text.secondary',
      }}
      {...props}
    />
  ),
}