# {{ .Title }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{ .RawContent }}
{{ $pages := where .Pages "Draft" false -}}
{{ if $pages }}
## Pages in this section
{{ range $pages }}
- [{{ .Title }}]({{ .Permalink }}): {{ partial "page-description.html" . }}
{{- end }}
{{ end }}
