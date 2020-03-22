<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
            <html>
                <style>
                    a {
                        color: blue;
                        text-decoration: underline;
                    }
                </style>
                <head>
                    <title>Project Record - TPC7</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1 style="text-align:center">Project Record - TPC7</h1>
                    <hr/>
                    <xsl:apply-templates/>
                </body>
            </html>      
    </xsl:template>
    
    <xsl:template match="meta">
        <table width="125%"> 
            <tr>
                <td><b>Key Name: </b><xsl:value-of select="keyname"/></td>
                <td><b>Begin Date: </b><xsl:value-of select="bdate"/></td>
            </tr>
            <tr>
                <td><b>Title: </b><xsl:value-of select="title"/></td>
                <td><b>End Date: </b><xsl:value-of select="edate"/></td>
            </tr>
            <tr>
                <td><b>Subtitle: </b><xsl:value-of select="subtitle"/></td>
                <td><b>Supervisor: </b>
                    <a href="{supervisor/homepage}"><xsl:value-of select="supervisor/name"/></a> - 
                    <a href="mailto:{supervisor/email}"><xsl:value-of select="supervisor/email"/></a>
                </td>
            </tr>
        </table>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="workteam">
        <h3>WorkTeam:</h3>
        <table width="50%">
            <xsl:apply-templates/>
        </table>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="member">
        <tr>
            <td>
                <ul>
                    <li><xsl:value-of select="identifier"/> - <b><xsl:value-of select="name"/></b> - <a href="mailto:{email}"><xsl:value-of select="email"/></a></li>
                </ul>
            </td>
            <td>
                <img src="{photo/@path}" width="100" height="100"/>
            </td>
        </tr>    
    </xsl:template>
    
    <xsl:template match="abstract">
        <h3>Abstract:</h3>
        <xsl:apply-templates/>
        <hr/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="p">
        <p><xsl:apply-templates/></p>
    </xsl:template>
    
    <xsl:template match="b">
        <b><xsl:apply-templates/></b>
    </xsl:template>
    
    <xsl:template match="i">
        <i><xsl:apply-templates/></i>
    </xsl:template>
    
    <xsl:template match="u">
        <u><xsl:apply-templates/></u>
    </xsl:template>
    
    <xsl:template match="xref">
        <a href="{@url}"><xsl:value-of select="."/></a>
    </xsl:template>
    
    <xsl:template match="deliverables">
        <h3>Deliverables:</h3>
        <ul>
            <xsl:apply-templates/> 
        </ul>
        <hr/>
    </xsl:template>
    
    <xsl:template match="deliverable">
        <li><a href="{@path}"><xsl:value-of select="."/></a></li>
    </xsl:template>
    
</xsl:stylesheet>