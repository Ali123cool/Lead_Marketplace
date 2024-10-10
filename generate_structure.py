import os

# Specify the root directory of your project
root_dir = r'C:\Users\aliez\OneDrive\Documents\Code\Lead_Marketplace'
structure_output_file = 'project_structure.txt'

def generate_directory_structure(root_dir, structure_output_file):
    with open(structure_output_file, 'w') as outfile:
        for foldername, subfolders, filenames in os.walk(root_dir):
            # Skip any folder that contains 'node_modules' or '.git' in its path
            if 'node_modules' in foldername or '.git' in foldername:
                continue
            # Write the folder name
            level = foldername.replace(root_dir, '').count(os.sep)
            indent = ' ' * 4 * level
            outfile.write(f'{indent}{os.path.basename(foldername)}/\n')
            
            # Filter subfolders to avoid traversing 'node_modules' and '.git'
            subfolders[:] = [d for d in subfolders if 'node_modules' not in d and '.git' not in d]
            
            # Write the filenames in the current directory
            for filename in filenames:
                file_indent = ' ' * 4 * (level + 1)
                outfile.write(f'{file_indent}{filename}\n')
    
    print(f'Folder and file structure saved to {structure_output_file}')

# Run the function
generate_directory_structure(root_dir, structure_output_file)
