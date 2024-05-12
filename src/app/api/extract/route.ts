import { type NextRequest, type NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import scrape from "~/lib/scraper";

// interface IResponse {
//   url: string;
// }

// const regex = /(?:https?:\/\/)?(?:www\.)?([^/]+)/i;

export async function POST(request: NextRequest, response: NextResponse) {
  // console.log(request.body);
  const elements = scrape(
    "https://www.indeed.com/m/viewjob?jk=c3dfcb71edf9a05b&advn=6344605918597007&adid=415580657&ad=-6NYlbfkN0C3b2-z9cercznCsq4EWrp4sYCSdW9ZH_q8b_LVUd17cd3z3lbOLVXSox9Sfp0bXtmETsFVtoY0rjbw8CCvEvrixQfCid7Yg3mP-NjbpONmsG7BeLhoS7iLczuhtLsa_zodB7Quzbl90tVWVcQPAWL9_oQHVkMPIe48pBsM4D3K2jRSHbRA2yG6kprLBqTv91frI0ESNwF4hEjpbaXyfXpVmZ8TuVBrbDbwpVgxYY9SOFa950GNaUJ2QbFRsiWzJVgFASP3bPANdP7bX_3UrhN9nkBbf2LjOsWU3xpPgPyYceOLmzW_zcfg8AtRdIeugROdYM0_88oHqdJ95lWycZebJZsX4SMVreIuGK38XMBheSdJHXKMU-Feyqufb3eSfuiIutLG-QfFCJHReILL__W-tCyNDZKJ6HWLz-NU_foq6Otk9YqCml3fsoo9_-Meu4frKozEh5omO3GTj-jGXWcAnuhHy_tP6-VhJ7WepimxmE7fsicf6RrAgQNNLg6_71Y_eJtXSQzduHwDQgUh6o-2dmLY8Jb93l_hL23wT_sB4mzF4PgXOL5MCpLyfO_Yn5MLpokXIOkZVO43l3XA42q2&xkcb=SoDA6_M3D2Y4PWwizx0LbzkdCdPP&from=hp&tk=1hpmalq6t23e8000",
  );

  // // const res = await request.json();
  // // const { url } = res;
  // try {
  //   // Fetch HTML content from the URL using Axios
  //   const result: AxiosResponse<string> = await axios.get(
  //     "https://www.linkedin.com/jobs/view/3835789457/?alternateChannel=search&refId=fdzNa%2FMrnR4hV8DvFpcHWQ%3D%3D&trackingId=TYIayYTxU04mOqfkJWTs0w%3D%3D",
  //   );

  //   console.log(result.data);
  //   const html = result.data;

  //   // Load HTML into Cheerio
  //   const $ = cheerio.load(html);

  //   // Extract any information you need or modify the HTML if necessary
  //   // For example, extracting the title of the page
  //   const pageTitle = $("top-card-layout__title").text();

  //   // Return the HTML or any processed information to the frontend
  return new Response(JSON.stringify({ title: elements }), { status: 200 });
  // } catch (error) {
  //   console.error("Error fetching HTML:", error);
  //   return new Response(JSON.stringify(error), { status: 500 });
  // }
}
