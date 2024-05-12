/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import puppeteer from "puppeteer";

export default async function scrape(url: string) {
  try {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(url);

    // const pageTitle = await page.title();

    // const xpath =
    //   "/html/body/div[2]/div[1]/div/span/div[4]/div[5]/div[2]/div/section/div/div[1]/div[2]/div[2]/div[1]/div/div[1]/div[1]/h2/span/text()";
    // // const getJobTitle = await getXpath.evaluate((el) => el.innerText);
    // const elements = await page.evaluate((xpath) => {
    //   const nodesSnapshot = document.evaluate(
    //     xpath,
    //     document,
    //     null,
    //     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    //     null,
    //   );
    //   const elements = [];
    //   for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
    //     const item = nodesSnapshot.snapshotItem(i);
    //     if (item !== null) {
    //       elements.push(item.textContent);
    //     }
    //   }
    //   return elements;
    // }, xpath);

    // console.log(elements);
    // console.log(pageTitle);
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // await page.goto(url);

    // // /html/body/div[2]/div[1]/div/span/div[4]/div[5]/div[2]/div/section/div/div/div[2]/div[2]/div[1]/div/div[1]/div[1]/h2/span/text()
    // // Here's where the magic happens - you'll need the right selector
    // const jobTitleElement = await page.waitForSelector(
    //   "jobsearch-JobInfoHeader-title css-jf6w2g e1tiznh50",
    // );

    // console.log(jobTitleElement);
    // const jobTitle = await jobTitleElement?.evaluate((el) => el.textContent);

    // await browser.close();
    // return jobTitle;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // Here's where the magic happens - you'll need the right selector
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const jobTitleElement = await page.$x(
      '//*[@id="viewJobSSRRoot"]/div[2]/div[2]/div[1]/div[1]/div[1]/h1/span',
    ); // Adjust XPath as needed
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const jobTitle = await jobTitleElement.eval((el) => el.textContent);
    console.log(jobTitle);
    await browser.close();
    return jobTitle;
  } catch (error) {
    // return getJobTitle;
    console.log(error);
  }
}

// void scrape(
//   "https://www.indeed.com/?advn=8876452989351355&vjk=ec7f774ce9a3d1d1",
// );
