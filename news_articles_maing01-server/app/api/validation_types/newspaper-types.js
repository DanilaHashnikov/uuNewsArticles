const newspaperCreateDtoInType = shape({
  name: uu5String(200).isRequired(),
  creationDate: date().isRequired(),
  articlesCount: integer(0),
});

const newspaperGetDtoInType = shape({
  id: id().isRequired(),
});

const newspaperUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  cover: binary(),
});

const newspaperDeleteDtoInType = shape({
  id: id().isRequired(),
});

const newspaperListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
