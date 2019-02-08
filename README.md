# Acapulco (Attack Community grAPh COnstruction) using an Elastic Search backend.

This is a fork of the original Acapulco app (https://github.com/hgascon/acapulco). The aim of this modified version is to get events from an Elastic Search backend insted of a Splunk backend. Then the events are clustered using DBSCAN or K-means algorithms and displayed at an external client using parallel coordinates graphs based on the D3.js visualization library.

## License

The Acapulco Project software is licensed under the GNU GPL license.

## Installation

To deploy the visualization client, you may copy the "client" folder to the home path of you preferred web server. The needed JavaScript SDK files are already in place but you may need to install node.js if you have not done it yet.

If you don't have a running web server at hand, you can install node.js and run a simple server from the client folder:

> node sdkdo runserver

You will be able to access the client at http://localhost:6969/index.html

### Dependencies

In order to run all the elements, you'll need to install:

1. A running Splunk server with it REST API available at the default 8089 port.
2. The Splunk JavaScript SDK [http://dev.splunk.com/view/javascript-sdk/SP-CAAAECM]
3. node.js [http://nodejs.org/]
4. Scikit-learn [http://scikit-learn.org]
5. Scipy [http://www.scipy.org/]
6. Numpy [http://numpy.scipy.org/]


## Usage


### The Cluster Runner

The cluster runner script can be run periodically from the command line:

	Usage: runner_mod_an.py [options] <log dir>

	Options:  
	-h, --help            show this help message and exit  
	-o OUTPUT_TYPE, --output=OUTPUT_TYPE  
	                     Output type: csv or json (default csv)  
	-d OUTPUT_DIR, --outdir=OUTPUT_DIR  
	                     Output directory (default log dir)  
	Usage: runner.py [options] <log dir> 

Once you run it, you can expect and output similar to this:

	 $> python runner_mod_an.py 

	 [*] Writing output...  
	 [*] Clustering saddr...  
	 [*] Clustering sport...  
	 [*] Clustering dport...  
	 [*] Clustering daddr...  
	 [*] Clustering url...  
	 [*] Writing output...  

Files "acapulco.log" and "acapulco_plain.log" will be created in the logging directory. You can add the following line to your crontab to run the script every day and have the data updated for new events.

> 0 0 * * *  /bin/python  [...]/client/runner.py >> /var/log/acapulco_runner.log

### The D3 client

The visualization client allows to create parallel coordinate graphs from plain meta-events or their clustered version. You can use the slider selector to indicate the number of events that be retrieved from ElasticSearch to build the graph. The d3.js library and the javascript engine of the browser will become slower as you request more data. Currently, the maximum is set to a safe top of 10000 events but I am actively thinking of ways to solve this.

The first think you need to do is log in the Splunk server with your user and password and a new button will appear if the logging has been successful.

If clustered data is selected and retrieved, the controls buttons allow to show the density of the different clusters.





