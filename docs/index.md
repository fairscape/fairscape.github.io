# Welcome to FAIRSCAPE

FAIRSCAPE[^1] is a computational framework written in Python that implements the FAIR[^2] data principles on components such as datasets, software, computations, runtime parameters, environment and personnel involved in a computational analysis. It generates fully FAIR evidence of correctness of the analysis by recording formal representations of the components and their interactions in the form of a graph called Evidence Graph. For every computational result, FAIRSCAPE creates a machine interpretable Evidence Graph whose nodes and edges may contain persistent identifiers with metadata resolvable to the underling components.

FAIRSCAPE provides a command line client tool to package and validate the components with metadata, a schema generation and validation component for the datasets, a graphical user interface (GUI) for creating RO-Crate packages, and a REST API to perform various operations on the server-side. Together, these tools enable users to interact with FAIRSCAPE in ways that best suit their workflow and technical preferences.

## FAIRSCAPE Server

### FAIRSCAPE Server - MDS

The Metadata Service (MDS) of the FAIRSCAPE application is the core backend service responsible for metadata management. MDS is a RESTful API implemented in Python with the FastAPI framework. This service provides persistent globally unique identifiers (GUIDs) as ARKs for many types of digital objects and maintains provenance metadata during the data science life-cycle.

- **[GitHub Repository](https://github.com/fairscape/mds_python)**

## FAIRSCAPE Client

### Command Line Client

#### FAIRSCAPE CLI - A Validation and Packaging Command Line Tool

A data validation and packaging utility for the FAIRSCAPE ecosystem. It provides a command line interface that allows client-side remote teams to create [RO-Crate](https://www.researchobject.org/ro-crate/) and [BagIt](https://datatracker.ietf.org/doc/html/rfc8493) packages.

- **[Documentation](https://fairscape.github.io/fairscape-cli/)**

### GUI Client

#### FAIRSCAPE GUI - An RO-Crate Packaging and Upload Tool

A data packaging utility for the FAIRSCAPE ecosystem. It provides a graphical user interface that allows client-side remote teams to create [RO-Crate](https://www.researchobject.org/ro-crate/) packages.

- **[Documentation](https://fairscape.github.io/FairscapeFrontEnd/)**

## FAIRSCAPE REST API Documentation

FAIRSCAPE provides a REST API documentation UI powered by [Swagger UI](https://github.com/swagger-api/swagger-ui). This interface allows clients to use the `Try it out` button to run operations on the endpoints.

- **[API Documentation](https://fairscape.net/api/docs)**

[^1]: Levinson, M. A., Niestroy, J., Al Manir, S., Fairchild, K., Lake, D. E., Moorman, J. R., & Clark, T. (2022). FAIRSCAPE: a Framework for FAIR and Reproducible Biomedical Analytics. Neuroinformatics, 20(1), 187–202. <https://doi.org/10.1007/s12021-021-09529-4>
[^2]: Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J. W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., Gonzalez-Beltran, A., … Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific data, 3, 160018. <https://doi.org/10.1038/sdata.2016.18>
