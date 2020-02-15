<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text" indent="yes"/>
    
    <xsl:template match="obra">
        ###  http://www.semanticweb.org/joao/ontologies/2020/1/arquivo-musical#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
                :Obra ;
        <xsl:for-each select="instrumentos/instrumento">
            :utiliza :<xsl:value-of select="translate(designacao,' ','')"/>-<xsl:value-of select="../../@id"/> ;
        </xsl:for-each>
            :arranjo "<xsl:value-of select="arranjo"/>"^^xsd:string ;
            :compositor "<xsl:value-of select="compositor"/>"^^xsd:string ;
            :tipo "<xsl:value-of select="tipo"/>"^^xsd:string ;
            :titulo "<xsl:value-of select="titulo"/>"^^xsd:string .
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="instrumento">
        ###  http://www.semanticweb.org/joao/ontologies/2020/1/arquivo-musical#<xsl:value-of select="translate(designacao,' ','')"/>-<xsl:value-of select="../../@id"/>
        :<xsl:value-of select="translate(designacao,' ','')"/>-<xsl:value-of select="../../@id"/> rdf:type owl:NamedIndividual ,
                :Instrumento ;
            :designacao "<xsl:value-of select="designacao"/>"^^xsd:string .
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="partitura">
        ###  http://www.semanticweb.org/joao/ontologies/2020/1/arquivo-musical#<xsl:value-of select="@path"/>
        :<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
                :Partitura ;
                :referenteA :<xsl:value-of select="translate(../designacao,' ','')"/>-<xsl:value-of select="../../../@id"/> ;
            :voz "<xsl:value-of select="@voz"/>"^^xsd:string ;
            :path "<xsl:value-of select="@path"/>"^^xsd:string ;
            :tipo "<xsl:value-of select="@type"/>"^^xsd:string .
    </xsl:template>
    
    <xsl:template match="titulo"/>
    <xsl:template match="tipo"/>
    <xsl:template match="compositor"/>
    <xsl:template match="designacao"/>
    <xsl:template match="subtitulo"/>
    <xsl:template match="arranjo"/>
    <xsl:template match="editado"/>
    
</xsl:stylesheet>