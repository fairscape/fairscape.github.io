# Welcome to FAIRSCAPE

FAIRSCAPE[^1] is a computational framework written in Python that implements the FAIR[^2] data principles on components such as datasets, software, computations, runtime parameters, environment and personnel involved in a computational analysis. It generates fully FAIR evidence of correctness of the analysis by recording formal representations of the components and their interactions in the form of a graph called Evidence Graph. For every computational result, FAIRSCAPE creates a machine interpretable Evidence Graph whose nodes and edges may contain persistent identifiers with metadata resolvable to the underling components.

FAIRSCAPE provides a command line client tool to package and validate the components with metadata, a schema generation and validation component for the datasets, a graphical user interface (GUI) for creating RO-Crate packages, and a REST API to perform various operations on the server-side. Together, these tools enable users to interact with FAIRSCAPE in ways that best suit their workflow and technical preferences.

## Components

### [FAIRSCAPE Server](/components/server)

The core backend service (MDS - Metadata Service) responsible for metadata management is implemented in Python using the FastAPI framework. The server:

- Receives, catalogs, indexes, and stores uploaded RO-Crate packages
- Extracts and registers components and associated metadata
- Interpolates, reasons upon, and extends provenance graphs
- Provides REST API access

### [Command Line Client (CLI)](/components/CLI)

A pip-installable validation and packaging utility that allows:

- Creation and management of RO-Crates
- Association of descriptive metadata using schema.org vocabulary
- Direct packaging or URI referencing of data

### [Graphical User Interface (GUI)](/components/GUI)

A user-friendly interface based on electron, React, and javascript that provides:

- Visual forms for RO-Crate creation
- Step-by-step package creation workflow
- Package review and validation
- Direct upload capabilities

### [FAIRSCAPE Web Server](/components/webserver)

The FAIRSCAPE Web Server provides a React-based interface for viewing metadata and managing RO-Crates uploaded to FAIRSCAPE.

## Use Cases

FAIRSCAPE has been successfully deployed in various contexts:

- Critical care medicine at the UVA Center for Advanced Medical Analytics
- NIH Bridge2AI program for functional genomics and clinical applications
- Cell Maps for Artificial Intelligence (CM4AI) project

---

[^1]: Al Manir, S., Levinson, M.A., Niestroy, J., Churas, C., Parker, J.A., & Clark, T. (2024). FAIRSCAPE: An Evolving AI-readiness Framework for Biomedical Research
[^2]: Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific data, 3, 160018. https://doi.org/10.1038/sdata.2016.18
