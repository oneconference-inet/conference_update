const https = require("https");

const domain = "meet-poc.one.th";
// const domain = "oneconference-new.inet.co.th";

async function httpsGet(hostname, path, headers) {
  return new Promise(async (resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: "GET",
      headers: headers,
    };

    let body = [];

    const req = await https.request(options, (res) => {
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const data = Buffer.concat(body).toString();
        resolve(data);
      });
    });
    req.on("error", (e) => {
      // console.log(`ERROR httpsGet: ${e}`);
      reject(e);
    });
    req.end();
  });
}

async function httpsPost(hostname, path, data) {
  return new Promise(async (resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = [];

    const req = await https.request(options, (res) => {
      // console.log('httpsPost statusCode:', res.statusCode);
      // console.log('httpsPost headers:', res.headers);

      res.on("data", (d) => {
        body.push(d);
      });
      res.on("end", () => {
        // console.log(`httpsPost data: ${body}`);
        // resolve(JSON.parse(Buffer.concat(body).toString()));
        // resolve("{'name': 'jason'}");
      });
    });
    req.on("error", (e) => {
      // console.log(`ERROR httpsPost: ${e}`);
      reject(e);
    });
    req.write(JSON.stringify(data));
    req.end();
  });
}

const resGET = httpsGet(domain, "/backend/api/rooms/getAllroom", {
  Authorization:
    "Bearer OoLdyF822kaIi28K35qCzXMwAxQP56Mt53p0T3O3VcgofWjbq8Kr9Ajz6WId3ffilkZXm0pWBCgfd8FVqaPBkYAbH4kXbqFph4p7",
});

resGET.then(function (result) {
  let rooms = JSON.parse(result);

  let now = Date.now();
  let timeDiff = 1800000; // 1hour = 60mins = 3600000millisec.

  for (room of rooms.data) {
    if (parseInt(room.timelastuser) && now - parseInt(room.timelastuser) > timeDiff) {
      console.log(`Got room with meeting_id: ${room.meeting_id} Deleted`);

      httpsPost(domain, "/endmeeting", {
        meetingid: room.meeting_id,
      })
    }
  }

  console.log("------------------------");
  console.log(`Run success!`);
  console.log("------------------------");
});
