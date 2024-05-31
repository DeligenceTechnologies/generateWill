const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const { open } = require("sqlite");

async function openDB() {
  return open({
    filename: "./familyDetails.db",
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await openDB();
  await db.migrate({ force: "last" });
  const person = await db.all("SELECT * from person");
  console.log("All Persons", JSON.stringify(person, null, 2));
  const FamilyTree = await db.all("SELECT * from FamilyTree");
  console.log("All FamilyTree", JSON.stringify(FamilyTree, null, 2));
  const Assets = await db.all("SELECT * from Assets ");
  console.log("All Assets ", JSON.stringify(Assets, null, 2));
  const AssetDistribution = await db.all("SELECT * from AssetDistribution ");
  console.log("All Assets ", JSON.stringify(AssetDistribution, null, 2));
}

setup();
