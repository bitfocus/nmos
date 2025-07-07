/**
 * @param versions - The versions to check
 * @param supportedVersions - The versions we support
 * @returns The highest version we support, or null if no version is supported
 */

export const getHighestMatchingVersion = <T extends string[], U extends string[]>(
	supportedVersions: T,
	versions: U,
): T[number] | null => {
	return versions.reduce((highest: T[number] | null, version) => {
		if (supportedVersions.includes(version)) {
			return version
		}
		return highest
	}, null)
}
