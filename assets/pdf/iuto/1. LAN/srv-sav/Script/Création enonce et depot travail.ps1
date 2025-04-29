# Définir le chemin vers le fichier CSV sur le partage réseau
$CsvPath = "\\10.254.254.251\Script\liste-IUTO-serv-fichierv2.csv"

# Récupérer le nom d'utilisateur actuel
$User = $env:USERNAME

# Vérifier si le fichier CSV existe
if (-Not (Test-Path $CsvPath)) {
    Write-Host "Erreur : Le fichier CSV $CsvPath est introuvable."
    exit 1
}

# Lire le fichier CSV
$CsvData = Import-Csv -Path $CsvPath -Delimiter ';'

# Vérifier si le fichier CSV est vide
if ($CsvData.Count -eq 0) {
    Write-Host "Erreur : Le fichier CSV est vide ou mal formaté."
    exit 1
}

# Trouver l'utilisateur dans le CSV
$UserData = $CsvData | Where-Object { $_.ID -eq $User }

# Vérifier si l'utilisateur est trouvé
if ($null -eq $UserData) {
    Write-Host "Erreur : L'utilisateur $User n'est pas trouvé dans le fichier CSV."
    exit 1
}

# Afficher les valeurs pour débogage
Write-Host "Section : $($UserData.Section)"
Write-Host "Année : $($UserData.Annee)"

# Construire dynamiquement le chemin réseau avec le sous-dossier "Depot-travail"
$NetworkPath = "\\10.254.254.251\$($UserData.Section)\$($UserData.Section)$($UserData.Annee)\Depot-travail\$User"

# Afficher le chemin réseau pour débogage
Write-Host "Chemin réseau : $NetworkPath"

# Vérifier si le chemin existe
if (Test-Path $NetworkPath) {
    # Démonter le lecteur réseau Z: s'il existe déjà
    if (Test-Path Z:) {
        net use Z: /delete /yes 2>$null
    }

    # Monter le lecteur réseau Z: avec le chemin réseau
    net use Z: $NetworkPath /persistent:yes

    Write-Host "✅ Lecteur réseau monté avec succès : $NetworkPath"
} else {
    Write-Host "❌ Erreur : Le chemin réseau $NetworkPath n'existe pas."
    exit 1
}

# Construire dynamiquement le chemin réseau pour "Enonce"
switch ($UserData.Section) {
    "GEA" { $EnoncePath = "\\10.254.254.251\gea\$($UserData.Section)$($UserData.Annee)\Enonce" }
    "CHIMIE" { $EnoncePath = "\\10.254.254.251\chimie\$($UserData.Section)$($UserData.Annee)\Enonce" }
    "GMP" { $EnoncePath = "\\10.254.254.251\gmp\$($UserData.Section)$($UserData.Annee)\Enonce" }
    "GTE" { $EnoncePath = "\\10.254.254.251\gte\$($UserData.Section)$($UserData.Annee)\Enonce" }
    "INFO" { $EnoncePath = "\\10.254.254.251\info\$($UserData.Section)$($UserData.Annee)\Enonce" }
    "QLIO" { $EnoncePath = "\\10.254.254.251\qlio\$($UserData.Section)$($UserData.Annee)\Enonce" }
    default { Write-Host "❌ Erreur : Section inconnue $($UserData.Section)." ; exit 1 }
}

# Afficher le chemin réseau pour débogage
Write-Host "Chemin réseau Enonce : $EnoncePath"

# Vérifier si le chemin existe
if (Test-Path $EnoncePath) {
    # Démonter le lecteur réseau U: s'il existe déjà
    if (Test-Path U:) {
        net use U: /delete /yes 2>$null
    }

    # Monter le lecteur réseau U: avec le chemin réseau
    net use U: $EnoncePath /persistent:yes

    Write-Host "✅ Lecteur réseau Enonce monté avec succès : $EnoncePath"
} else {
    Write-Host "❌ Erreur : Le chemin réseau Enonce $EnoncePath n'existe pas."
    exit 1
}
