/**
 * @param versions - The versions to check
 * @param supportedVersions - The versions we support
 * @returns The highest version we support, or null if no version is supported
 */

const simpleSemverSort = (a: string, b: string) => {
	const [aMajor, aMinor] = a.replace('v', '').split('.').map(Number)
	const [bMajor, bMinor] = b.replace('v', '').split('.').map(Number)

	if (aMajor !== bMajor) {
		return bMajor - aMajor
	}
	return bMinor - aMinor
}

export const getHighestMatchingVersion = <T extends string[], U extends string[]>(
	supportedVersions: T,
	versions: U,
): T[number] | null => {
	// Filter to get only versions that are both available and supported
	const matchingVersions = versions.filter((version): version is T[number] => supportedVersions.includes(version))

	if (matchingVersions.length === 0) {
		return null
	}

	// Sort versions in descending order (highest first)
	// Assumes version format like "v1.2", "v1.3", etc.
	const sortedVersions = matchingVersions.sort(simpleSemverSort)

	return sortedVersions[0] ?? null
}
