/* eslint-disable */
const articleCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  authorId: id().isRequired(),
  newspaperId: id().isRequired(),
  topicIdList: array(id(), 1, 10).isRequired(),
  publicationDate: date().isRequired(),
  link: uri().isRequired()
})

const

  articleListDtoInType = shape({
  sortBy: oneOf(["name", "publicationDate"]),
  order: oneOf(["asc", "desc"]),
  topicList: array(id(), 10),
  authorId: id(),
  newspaperId: id(),
  publicationDate: date(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})

const articleDeleteDtoInType = shape({
  id: id().isRequired()
})

const articleUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  authorId: id(),
  newspaperId: id(),
  topicIdList: array(id(), 1, 10),
  publicationDate: date(),
  link: uri()
})
