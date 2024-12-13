# Traducir archivos strings
```python
from xml.etree.ElementTree import Element, SubElement, parse, ElementTree
from translate import Translator
import os

# Función para traducir texto
def translate_text(text, translator):
    translated = translator.translate(text)
    return translated

# Función para traducir un archivo strings.xml
def translate_strings_xml(input_file, target_languages, output_dir):
    # Leer el archivo XML de entrada
    tree = parse(input_file)
    root = tree.getroot()

    for lang in target_languages:
        translator = Translator(to_lang=lang, from_lang="es")
        # Crear un nuevo árbol para el idioma destino
        new_tree = ElementTree(Element(root.tag, attrib=root.attrib))
        new_root = new_tree.getroot()

        for string_element in root.findall("string"):
            name = string_element.get("name")
            if name:
                original_text = string_element.text
                translated_text = translate_text(original_text, translator)
                # Crear el elemento traducido

                new_string_element = SubElement(new_root, "string", attrib={"name": name})
                new_string_element.text = translated_text

        # Guardar el archivo traducido
        output_file = os.path.join(output_dir + "-" + lang, f"strings_{lang}.xml")
        new_tree.write(output_file, encoding="utf-8", xml_declaration=True)
        print(f"Archivo traducido guardado: strings_{lang}.xml")

# Configuración
input_file = "G:\\AndroidStudioProjects\\proyecto\\app\\src\\main\\res\\values\\strings.xml"
target_languages = ["en", "fr", "gl", "it"]  # Idiomas destino (ingles, francés, alemán, italiano)
output_dir = "G:\\AndroidStudioProjects\\proyecto\\app\\src\\main\\res\\values"  # Directorio de salida

# Crear el directorio de salida si no existe
for languages in target_languages:
    os.makedirs(output_dir + "-" + languages, exist_ok=True)

# Traducir el archivo
translate_strings_xml(input_file, target_languages, output_dir)
```