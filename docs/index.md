# Welcome to FAIRSCAPE

FAIRSCAPE[^1] is a computational framework written in Python that implements the FAIR[^2] data principles on components such as datasets, software, computations, runtime parameters, environment and personnel involved in a computational analysis. It generates fully FAIR evidence of correctness of the analysis by recording formal representations of the components and their interactions in the form of a graph called Evidence Graph. For every computational result, FAIRSCAPE creates a machine interpretable Evidence Graph whose nodes and edges may contain persistent identifiers with metadata resolvable to the underling components.

FAIRSCAPE provides a command line client tool to package and validate the components with metadata, a schema generation and validation component for the datasets, a graphical user interface (GUI) for creating RO-Crate packages, and a REST API to perform various operations on the server-side. Together, these tools enable users to interact with FAIRSCAPE in ways that best suit their workflow and technical preferences.

<div class="component-cards">
<a href="/getting-started/getting-started" class="component-card getting-started-card">
<h2>Ready to Get Started?</h2>
<p>Follow our Getting Started Guide to quickly set up a local FAIRSCAPE environment and create your first Research Object Crate (RO-Crate). You'll learn how to:</p>
<ul>
 <li>Deploy FAIRSCAPE locally using Docker Compose</li>
 <li>Create and package your first RO-Crate</li>
 <li>Upload and view your research objects through our web interface</li>
</ul>
</a>

</div>

<div class="section-divider"></div>

## FAIRSCAPE Key Components

<div class="components-container">
<a href="/components/server" class="component-card">
<h2>FAIRSCAPE MDS Server</h2>
The core backend service (MDS - Metadata Service) responsible for metadata management, implemented in Python using FastAPI. Handles package storage, metadata extraction, provenance tracking, and provides a REST API interface.
</a>

<a href="/components/CLI" class="component-card">
<h2>Command Line Client (CLI)</h2>
A pip-installable validation and packaging utility for creating and managing RO-Crates with descriptive metadata using schema.org vocabulary. Supports both direct packaging and URI referencing of data.
</a>

<a href="/components/GUI" class="component-card">
<h2>Graphical User Interface (GUI)</h2>
A user-friendly electron and React-based interface that provides visual forms for RO-Crate creation, step-by-step workflow guidance, package validation, and direct upload capabilities.
</a>

<a href="/components/webserver" class="component-card">
<h2>FAIRSCAPE Front-End Web Server</h2>
A React-based web interface for browsing, managing, and sharing RO-Crates uploaded to FAIRSCAPE. Features package visualization, metadata management, and provenance graph display.
</a>
</div>
</div>

<div class="section-divider"></div>

## Use Cases

FAIRSCAPE has been successfully deployed in various contexts:

<div class="component-card">
<ul>
 <li><strong>Critical Care Medicine</strong>: Deployed at the UVA Center for Advanced Medical Analytics</li>
 <li><strong>Functional Genomics</strong>: Supporting the NIH Bridge2AI program for clinical applications</li>
 <li><strong>Cell Mapping</strong>: Powering the Cell Maps for Artificial Intelligence (CM4AI) project</li>
</ul>
</div>

[^1]: Al Manir, S., Levinson, M.A., Niestroy, J., Churas, C., Parker, J.A., & Clark, T. (2024). FAIRSCAPE: An Evolving AI-readiness Framework for Biomedical Research
[^2]: Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific data, 3, 160018. https://doi.org/10.1038/sdata.2016.18
