var couchbase = require("couchbase");
var crypto = require("crypto");

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
		 const clusterConnStr = process.env.COUCHBASE_CONNECTION_STRING || "couchbase://localhost"; // Replace this with Connection String
		 const username = process.env.COUCHBASE_USERNAME || "Administrator"; // Replace this with username from database access credentials
		 const password = process.env.COUCHBASE_PASSWORD || "password"; // Replace this with password from database access credentials
		 const bucketName = process.env.COUCHBASE_BUCKET || "surveyform";
		 const scopeName = process.env.COUCHBASE_SCOPE || "_default";
		 const collectionName = process.env.COUCHBASE_COLLECTION || "_default ";

     const cluster = await couchbase.connect(clusterConnStr, {
		  username: username,
		  password: password,
		  // Use the pre-configured profile below to avoid latency issues with your connection.
		  configProfile: "wanDevelopment",
		});

    const bucket = cluster.bucket(bucketName);
    const collection = bucket.defaultCollection();

    var data = JSON.parse(event.body);
    let result = await collection.insert(crypto.randomUUID(), data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "it worked" }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
