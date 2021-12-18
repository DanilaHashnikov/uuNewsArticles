/* eslint-disable */
const topicCreateDtoInType = shape({
  name: string(200).isRequired(),
})

const topicListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})
