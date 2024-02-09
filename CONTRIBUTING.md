# CONTRIBUTING

This project is build on top of [Java](https://www.java.com/en/) and [Maven](https://maven.apache.org/).

It uses [jBake](https://jbake.org/) to generate the final content. See [jBake documentation](https://jbake.org/docs/)
for more information on how to use it.

Also, the [jBake Maven plugin](https://github.com/jbake-org/jbake-maven-plugin) is used to easy the tooling and
integration with our build pipelines.

As the template engine, [Thymeleaf](https://www.thymeleaf.org/) is used. Read the
[full documentation](https://www.thymeleaf.org/documentation.html) for more info.

The source code is located under `src/main/resources` and the jBake commands can be run in two ways: from the command
line and using the jBake Maven plugin.

## Usage from the command line

To use the `jbake` command directly from the command line, from the root directory, the source and target
directories must be specified as follows `jbake <jbake-option> <source> <output>`, where

- `<jbake-option` can be any of the possible jBake commands, such as `-b`, `-s`, etc.
- `<source>` must be `src/main/resources`
- `<output>` should be (highly recommended) `target`

Example: `jbake -b -s src/main/resources target`

## Usage from the jBake Maven Plugin

Simply run the plugin goal, either from the command line or from you IDE. The input and out directories have already
been configured.

Example `./mvnw jbake:inline`

## Creating an article

As a standard, we're writing all articles files as either [AsciiDoc](https://asciidoc.org/)(`.adoc`) or HTML(`.html`).
The preferred option is AsciiDoc as it provides more features,
including generating a table of content for the rendered html.

### File structure

- Create the year of the article under the `articles` directory (if not already crated)
- Name the file according to the article name. i.e.: for an article called "Why Java?", the file could be
  called `why-java.adoc` or `why-java.html`

### Metadata

- Define:
    * `title`
    * `type=post`
    * `date` (it can be a future date to keep the article in draft mode, if `status` is not `published`)
    * `tags` (separated by comma -- `,`)
    * `status` (it can be `published`, `draft` for work in progress, or `published-date`.
      See https://jbake.org/docs/2.6.7/#status)
    * `summary`
    * optionally, you can define the following [Open Graph](https://ogp.me/) (_og_) _meta_ values
        + `og_title` -> `title` (defaults to `title`)
        + `og_desc` -> `description` (defaults to `summary`)
        + `og_author` -> `author`
        + `ogKeyworkds` -> `keywords` (defaults to the article tags)
        + `og_locale` -> `locale`
        + `og_img` -> `image`, the location of the image to be used on social media when sharing the article (we're
          following as a convention to name the file as the name of the adoc/html file plus `_social` at the end)
        + `og_article_modified_time` -> `article:modified_time` (defaults to the article date)
        + `og_article_author` -> `article:author`
        + `og_article_tags` -> `article:tag` (defaults to the article tags)
        + optionally, define `image_src` with the location of the thumbnail image to be used on the "articles" page
        + if `image_src` is defined, then `image_alt` should also be defined -- this is the `alt` attribute of the `img`
          html element

### Images

Images used to be displayed in the article thumbnail (`image_src`) should be:

- located under articles{year}/images/{month}{image-name} (see current examples to get an idea in practice how it looks
  like)
- _width_: 500px
- _height_: 120px

Images used to be displayed on social media (`og_img`) should be:

- located under articles{year}/images/{month}{image-name} (see current examples to get an idea in practice how it looks
  like)
- _width_: 1024px
- _height_: 512px

As a recommendation, this image generator could be used: https://deepai.org/machine-learning-model/old-style-generator
or any of its alternatives in https://deepai.org/

## Creating a book note

As a standard, we're writing all notes files as either [AsciiDoc](https://asciidoc.org/) (`.adoc`) or HTML (`.html`).

### File structure

- Create the year of the note under the `notes` directory (if not already crated); this is the year the file is created
- Name the file according to the book name. i.e.: for an article called "Why Java?", the file could be
  called `why-java.adoc` or `why-java.html`

### Metadata

- Define:
    * `read` (indicates the status: `done` means the reading was finished, `progress` means the reading is in progress,
      and `future` means the reading has not started)
    * `title`
    * `summary`
    * `date` (it can be a future date to keep the note in draft mode, if `status` is not `published`)
    * `type=booknote`
    * `tags` (separated by comma -- `,`)
    * `status` (it can be `published`, `draft` for work in progress, or `published-date`.
      See https://jbake.org/docs/2.6.7/#status)
    * `authors` (the authors of the book from which the notes are being taken from)
    * `publisher` (the publisher of the book from which the notes are being taken from)
    * `published` (the date when the book from which the notes are being taken from was released)
    * optionally, you can define the same [Open Graph](https://ogp.me/) (_og_) _meta_ values described in the previous
      "articles" section, including `image_src`, `image_alt`, and `og_img`
    * optionally, `amazon_link`, with the link to buy the book on Amazon
    * optionally, `orreilly_link`, with the link to buy the book on O'REILLY

### Images for book notes

Images used to be displayed in the book thumbnail (`image_src`) should be:

- located under notes{year}/images/{image-name} (see current examples to get an idea in practice how it looks
  like)
- _width_: 630px
- _height_: 850px

## Document customization

In both, articles and book notes is possible to create a table of content (toc) for those created as AsciiDoc files.
To do that, the [document attributes](https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes/)
[`:toc:`](https://docs.asciidoctor.org/asciidoc/latest/toc/) and `:jbake-table_of_content:` (custom) must be set;
for now (and as standard) it can only be set to `left` (other values don't have any effect).

## Build and publish

When creating an article, if it's a work in progress, you can skip the pages build by appending `[skip-ci]` to the end
of the commit message.

IMPORTANT: Once an article is published, if it has received any interactions through the Disqus integration, the
article file name must NOT be updated, so the comments, reactions, etc. are not lost. This is because we're using the
file name as the thread id.
