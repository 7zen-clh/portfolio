# Charger le fichier CSV avec encodage UTF-8
$csv = Import-Csv -Path "C:\Script\liste-IUTO-serv-fichierv2.csv" -Delimiter ";" -Encoding UTF8

# Parcourir chaque ligne du CSV
foreach ($row in $csv) {
    # Vérifier si les valeurs sont présentes
    if ($row.Chemin -and $row.ID) {
        # Construire le chemin final
        $dossier = Join-Path -Path $row.Chemin -ChildPath $row.ID

        # Créer le dossier s'il n'existe pas déjà
        if (-not (Test-Path $dossier)) {
            New-Item -Path $dossier -ItemType Directory -Force | Out-Null
            Write-Host "Dossier créé : $dossier"
        } else {
            Write-Host "Le dossier existe déjà : $dossier"
        }

        # Définir les permissions NTFS
        $utilisateur = $row.ID  # Le nom d'utilisateur doit correspondre au nom du dossier
        $acl = Get-Acl -Path $dossier
        
        # Créer une nouvelle règle d'accès pour l'utilisateur
        $permission = New-Object System.Security.AccessControl.FileSystemAccessRule("$utilisateur","Modify","ContainerInherit,ObjectInherit","None","Allow")
        
        # Appliquer la règle d'accès
        $acl.SetAccessRule($permission)
        Set-Acl -Path $dossier -AclObject $acl
        
        Write-Host "Droits NTFS appliqués pour $utilisateur sur $dossier"
    } else {
        Write-Host "⚠️ Ligne ignorée (Chemin ou ID vide) : $($row | ConvertTo-Json -Compress)"
    }
}
