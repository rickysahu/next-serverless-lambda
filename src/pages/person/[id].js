import { getPersonData } from "../api/person/[id]";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";


function Person({ data }) {
  return (
    <div>
      yo
      <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
    </div>
  )
}


export async function getServerSideProps({ req, res }) {
  // Fetch data from external API
  let data = await getPersonData(req, res)

  // Pass data to the page via props
  return { props: { data } }
}

export default Person;
