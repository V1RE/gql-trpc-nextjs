import { createRouter } from "./context";
import { z } from "zod";
import { createClient } from "urql";
import COUNTRY_QUERY from "./countries.graphql";

const client = createClient({
  url: "https://countries.trevorblades.com",
});

export const exampleRouter = createRouter().query("countries", {
  input: z.object({
    countryCode: z.string(),
  }),
  async resolve({ input }) {
    const { data } = await client
      .query(COUNTRY_QUERY, { code: input.countryCode })
      .toPromise();
    return data;
  },
});
