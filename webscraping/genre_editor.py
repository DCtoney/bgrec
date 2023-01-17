import json

data = json.loads(open("scripts/BGG_DATA.json", "r", encoding="utf8").read())
for game in data["games"]:
    print("Editing data for " + game["name"])
    game["mechanics"] = game["mechanics"].split(", ")
    game["domains"] = game["domains"].split(", ")

open("scripts/BGG_DATA.json", "w", encoding="utf8").write(json.dumps(data, indent=4))