from urllib.request import urlopen
import json
import re as regex
from time import time
from sys import exit
from bs4 import BeautifulSoup

json_data = json.loads(open("code/data/BGG_DATA.json", "r").read())
start = time()
for game in json_data["games"]:
    try:
        print(f"[{round(game['rank']/203.44, 3)}%] Getting data for {game['name']} ({round(time() - start, 3)}s since start)")
        resource = urlopen(f"https://boardgamegeek.com/boardgame/{game['id']}")
        content = resource.read().decode(resource.headers.get_content_charset())
        match = regex.search(r"GEEK\.geekitemPreload\s*=\s*([\s\S]+?)GEEK\.geekitemSettings", content)
        if match:
            game_json = json.loads(match[1].strip()[:-1])["item"]
            game["minPlaytime"] = int(float(game_json["minplaytime"]))
            game["maxPlaytime"] = int(float(game_json["maxplaytime"]))
            game["shortDescription"] = game["description"]
            game["longDescription"] = regex.sub(r"\s+", " ", BeautifulSoup(game_json["description"], features="html.parser").get_text().strip())
            game["types"] = game["genres"]
            game["genres"] = list(map(lambda game: game["name"], game_json["links"]["boardgamecategory"]))
            game["publishers"] = list(map(lambda publisher: publisher["name"], game_json["links"]["boardgamepublisher"]))
            game.pop('playtime', None) # Remove "playtime"
            game.pop("description", None) # Remove "description"
        else:
            print(f"No data found for {game['name']}. Skipping.")
            raise Exception()
    except KeyboardInterrupt:
        print("User aborted. Terminating.")
        exit()
    except:
        print(f"Error getting data for {game['name']}. Skipping.")
        game.pop('playtime', None)
        game.pop("description", None)
        game["minPlaytime"] = 0
        game["maxPlaytime"] = 0
        game["shortDescription"] = "No description provided."
        game["longDescription"] = "No description provided."
        game["types"] = []
        game["genres"] = []
        game["publishers"] = []

print("Data collected. Writing to scripts/BGG_DATA.json in case of failure. If data is correct, copy + paste it into code/data/BGG_DATA.json")
open("scripts/BGG_DATA.json", "w").write(json.dumps(json_data, indent=4))
print(f"Data written ({round(time() - start, 3)}s total)")
