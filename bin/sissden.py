from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
import os
import sys
'''
es = Elasticsearch(
            ['index.eval.sissden.eu:443'],
                http_auth="AKIDPOSTE:PhieVe8va2Ooloth6aepoung9uraiquah7ohgaeD",
                    use_ssl=True,
                        verify_certs=False,
                        )

hits = Search(index='cowrie-*', using=es).sort('-@timestamp').query("exists", field="dest_ip").execute()
for hit in hits:
    print(hit.endTime,hit.src_ip, hit.src_port, hit.dest_ip, hit.dest_port)
'''
print('cane')

sys.stdout.flush()