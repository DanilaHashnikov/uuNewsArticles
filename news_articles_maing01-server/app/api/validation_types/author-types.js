/* eslint-disable */
const authorCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
})

const authorListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})
