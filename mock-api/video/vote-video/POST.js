module.exports = (request, response) => {
  const votedType = request.body.votedType;
  const id = request.body.id;

  return response.status(200).send({
    data: {
      id: id,
      votedType: votedType,
    },
  });
};
