# {{ .Title }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{- $c := .RawContent -}}
{{- $c = replaceRE `\{\{[<%]\s*relref\s+"([^"]+)"\s*[>%]\}\}` "$1" $c -}}
{{- $c = replaceRE `\{\{[<%]\s*contributor-credit\s+"([^"]+)"\s*[>%]\}\}` "$1" $c -}}
{{- $c = replaceRE `\{\{[<%]\s*/?\s*[a-zA-Z0-9_-]+[^}]*?[>%]\}\}` "" $c -}}
{{ $c }}
