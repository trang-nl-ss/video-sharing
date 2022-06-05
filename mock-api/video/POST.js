module.exports = (request, response) => {
  const url = request.body.url;
  const title = request.body.title;
  const description = request.body.description;
  const creator = request.body.creator;

  return response.status(200).send({
    data: {
      id: 40,
      url,
      title,
      description,
      creator,
    },
  });
};
