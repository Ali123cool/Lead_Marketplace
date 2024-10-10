import os

# Specify the root directory of your project
root_dir = r'C:\Users\aliez\OneDrive\Documents\Code\Lead_Marketplace'
code_output_file = 'all_code_document.txt'

# List of common text file extensions
text_file_extensions = ['.js', '.jsx', '.css', '.html', '.md', '.py', '.json', '.txt', '.ts', '.tsx', '.env']

def extract_code(root_dir, code_output_file):
    with open(code_output_file, 'w') as outfile:
        for foldername, subfolders, filenames in os.walk(root_dir, topdown=True):
            # Skip 'node_modules' directories
            if 'node_modules' in foldername.split(os.sep):
                subfolders[:] = []  # Don't descend into this directory
                continue  # Skip to the next iteration

            for filename in filenames:
                # Skip 'package-lock.json' and check if the file has a valid text extension
                if filename == 'package-lock.json' or not any(filename.endswith(ext) for ext in text_file_extensions):
                    continue

                # Get the full file path
                file_path = os.path.join(foldername, filename)

                # Attempt to open and read the file
                try:
                    with open(file_path, 'r', errors='ignore') as infile:
                        content = infile.read()
                    # Write the file path and its content to the output file
                    outfile.write(f'\n\n--- {file_path} ---\n\n')
                    outfile.write(content)
                except Exception:
                    # If there is an issue reading the file, skip it
                    continue

    print(f'Code extracted to {code_output_file}')

# Run the function
extract_code(root_dir, code_output_file)
