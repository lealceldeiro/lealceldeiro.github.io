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
