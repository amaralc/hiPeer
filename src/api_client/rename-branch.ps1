Param (
    [Parameter(Mandatory = $true)]
    [string]$OldBranch,
    [Parameter(Mandatory = $true)]
    [string]$NewBranch
)

git branch -m origin/$OldBranch $NewBranch
# git push origin :$OldBranch $NewBranch
git push origin -u $NewBranch
