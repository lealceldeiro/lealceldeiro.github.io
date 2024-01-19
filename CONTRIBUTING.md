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

As a standard, we're writing all articles files in HTML format (`.html`).

### File structure

- Create the year of the article under the `articles` directory (if not already crated)
- Name the file according to the article name. i.e.: for an article called "Why Java?", the file could be
  called `why-java.html`

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
        + `ogDesc` -> `description` (defaults to `summary`)
        + `ogAuthor` -> `author`
        + `ogKeyworkds` -> `keywords` (defaults to the article tags)
        + `ogLocale` -> `locale`
        + `ogImg` -> `image`
        + `ogArticleModifiedTime` -> `article:modified_time` (defaults to the article date)
        + `ogArticleAuthor` -> `article:author`
        + `ogArticleTags` -> `article:tag` (defaults to the article tags)
        + optionally, define `imageSrc` with the location of the thumbnail image to be used on the "articles" page and on social media when sharing the article
        + if `imageSrc` is defined, then `imageAlt` should also be defined -- this is the `alt` attribute of the `img` html element

When creating an article, if it's a work in progress, yuo can skip the pages build by appending `[skip-ci]` to the end
of the commit message.

IMPORTANT: Once an article is published, if it has received any interactions through the Disqus integration, the
article file name must NOT be updated, so the comments, reactions, etc. are not lost. This is because we're using the
file name as the thread id.

### Images

Images used to be displayed in the article thumbnail (`imageSrc`) should be:

- located under articles{year}/images/{month}{image-name} (see current examples to get an idea in practice how it looks like)
- _width_: 500px
- _height_: 120px

As a recommendation, this image generator could be used: https://deepai.org/machine-learning-model/old-style-generator or any of its alternatives in https://deepai.org/
