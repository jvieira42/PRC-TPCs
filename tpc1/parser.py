import csv

with open('PRI2019.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    with open('individuals.ttl', 'a') as f:
            
        for row in csv_reader:
            if (line_count > 0):
                f.write('### http://www.prc.di.uminho.pt/2020/salaAula#'+row[0]+'\n')
                f.write(':'+row[0]+' rdf:type owl:NamedIndividual ,\n')
                f.write('\t\t\t\t :Aluno ;\n')
                f.write('\t\t:frequenta :prc ;\n')
                f.write('\t\t:curso \"MIEI\"^^xsd:string ;\n')
                f.write('\t\t:email \"'+ row[0] +'@alunos.uminho.pt\"^^xsd:string ;\n')
                f.write('\t\t:ident \"'+ row[0] +'\"^^xsd:string ;\n')
                f.write('\t\t:nome \"'+ row[1] +'\"^^xsd:string .\n\n\n')
            line_count += 1