import json

# Load JSON data from the files with UTF-8 encoding
with open('Enspiron Save.json', 'r', encoding='utf-8') as f:
    enspiron_save = json.load(f)

with open('character.json', 'r', encoding='utf-8') as f:
    character_data = json.load(f)

# Get the keys from both JSON data
enspiron_keys = set(enspiron_save.keys())
character_keys = set(character_data.keys())

# Find keys that are in character_data but not in enspiron_save
keys_to_remove = character_keys - enspiron_keys

# Remove those keys from character_data
for key in keys_to_remove:
    del character_data[key]

# Save the updated character_data to a new file
with open('updated_character.json', 'w', encoding='utf-8') as f:
    json.dump(character_data, f, indent=4)

print(f"Removed {len(keys_to_remove)} keys from character.json and saved to updated_character.json")
