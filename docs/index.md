# Welcome to FAIRSCAPE

FAIRSCAPE is a computational framework written in Python that implements the FAIR[^1] data principles on components such as datasets, software, computations, runtime parameters, environment and personnel involved in a computational analysis. It generates fully FAIR evidence of correctness of the analysis by recording formal representations of the components and their interactions in the form of a graph called Evidence Graph. For every computational result, FAIRSCAPE creates a machine interpretable Evidence Graph whose nodes and edges may contain persistent identifiers with metadata resolvable to the underling components.

FAIRSCAPE provides a [command line client tool](/components/CLI) and a [graphical user interface (GUI)](/components/GUI) to package and validate the components with metadata, a schema generation and validation component for the datasets, a REST API to perform various operations on the [server-side](/components/server), and a [front-end web server](/components/webserver) to visualize the posted metadata. Together, these tools enable users to interact with FAIRSCAPE in the way that best suits their workflow.

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

## Key Components

<div class="components-container">
<a href="/components/server" class="component-card">
<h2>FAIRSCAPE Server</h2>
The FAIRSCAPE server is responsible for metadata management, implemented in Python using FastAPI. Handles package storage, metadata extraction, provenance tracking, and provides a REST API interface.
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
<h2>Web Client</h2>
A React-based web interface for browsing, managing, and sharing RO-Crates uploaded to FAIRSCAPE. Features package visualization, metadata management, and provenance graph display.
</a>
</div>
</div>

<div class="section-divider"></div>

## Use Cases

FAIRSCAPE was initially created to support fully-provenanced complex computations in predictive analytics for clinical research[^2]. The current version supports the NIH Bridge2AI program’s Functional Genomics Grand Challenge[^3], as well as ongoing clinical work in predictive analytics. We believe it is a useful tool for developing pre-model explainability in AI applications[^4], and plan to extend it further in this direction.

## Funding

FAIRSCAPE was developed with funding from the U.S. National Institutes of Health awards OT2OD032742, OT2OD032701, 5R01HD072071-10; and from the University of Virginia’s Frederick Thomas Fund.

[^1]: Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific data, 3, 160018. https://doi.org/10.1038/sdata.2016.18
[^2]: Niestroy JC, Moorman JR, Levinson MA, et al. Discovery of signatures of fatal neonatal illness in vital signs using highly comparative time-series analysis. npj Digit Med. 2022;5(1):6. doi:10.1038/s41746-021-00551-z
[^3]: Clark T, Schaffer LV, Obernier K, et al. Cell Maps for Artificial Intelligence: AI-Ready Maps of Human Cell Architecture from Disease-Relevant Cell Lines. Published online May 6, 2024.
[^4]: Clark T, Caufield H, Parker JA, et al. AI-readiness for Biomedical Data: Bridge2AI Recommendations. Published online October 25, 2024. doi:10.1101/2024.10.23.619844
