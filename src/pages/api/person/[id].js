// this can be an async function to a db or something else
export const getPersonData = async (req, res) => {
  const id = req.params.id || req.query.id
  return {name: `name${id||0}`, id}
}

export default async function handler(req, res) {
  try {
    const data = await getPersonData(req, res);
    res.status(200).json(data);
  } catch(e) {
    res.status(404).json({})
  }
};
  