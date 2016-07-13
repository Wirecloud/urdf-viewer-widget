import os

from wand.image import Image

converted_files = 0
for path, subdirs, files in os.walk('.'):
    files = [f for f in files if not f[0] == '.']
    subdirs[:] = [d for d in subdirs if not d[0] == '.']

    for file in files:
        _, plain_ext = os.path.splitext(file)
        ext = plain_ext.lower()
        if ext in ['.tif', '.tiff']:
            src_name=os.path.join(path, file)
            dst_name=os.path.join(path, file.replace(ext, '.png'))
            print("Convering %s into %s" % (src_name, dst_name))
            with Image(filename=src_name) as i:
                with i.convert('png') as converted:
                    converted.save(filename=dst_name)
                    converted_files += 1
        elif ext == '.dae':
            src_name=os.path.join(path, file)
            with open(src_name, 'r') as i:
                contents = i.read()

            if '.tif' in contents:
                contents = contents.replace('.tif', '.png')

                print("Fixing %s" % src_name)
                with open(src_name, 'w') as f:
                    f.write(contents)

if converted_files > 0:
    print("Converted %s image files" % converted_files)
