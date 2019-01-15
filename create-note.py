#!/usr/bin/env python3

from os import path
from os import makedirs
import argparse
import datetime

parser = argparse.ArgumentParser()
parser.add_argument('dest', type=str, nargs=1, help='Destination folder')
parser.add_argument('file', type=str, nargs=1, help='Destination file')
args = parser.parse_args()


def yes_no(prompt):
    answer = input(prompt)
    return answer == 'y' or answer == 'Y'


def get_template(title, description, tags, date):
    if len(tags) > 0:
        tags = ', '.join(tags)
    else:
        tags = ''

    template = (
         "---\n"
        f"title: '{title}'\n"
        f"date: '{date}'\n"
        f"description: '{description}'\n"
         "published: false\n"
        f"tags: [{tags}]\n"
         "---\n\n"
         "<!--Content-->"
    )

    return template


def get_tags():
    tags = input('tags (separated by space): ')

    if len(tags) > 0:
        return list(map(lambda tag: f"'{tag}'", tags.split(' ')))
    else:
        return []


def main():
    to = f'./content/{args.dest[0]}'
    new_note = f'{to}/{args.file[0]}.md'
    prompt = f"file '{new_note}' aready exists; continue? (y/N): "

    force_overwrite = True

    if not path.exists(to):
        print(f"creating new directory '{to}'")
        makedirs(to)

    if path.exists(new_note):
        force_overwrite = yes_no(prompt)

    if force_overwrite:
        title = input('title: ')
        description = input('description: ')
        tags = get_tags()
        date = datetime.datetime.now().strftime('%Y-%m-%d')

        with open(new_note, 'w+') as f:
            f.write(get_template(title, description, tags, date))
            print(f"\nnew file created: '{new_note}'")
    else:
        print('\n...leaving')

    return 1 if not force_overwrite else 0


if __name__ == '__main__':
    exit(main())

