import {
  DefaultVersioningStrategy,
  DefaultVersioningStrategyOptions,
} from './default';
import {
  VersionUpdater,
  MinorVersionUpdate,
  CustomVersionUpdate,
} from '../versioning-strategy';
import { ConventionalCommit } from '../commit';
import { Version } from '../version';
import { logger as defaultLogger } from '../util/logger';


export interface SourceCustomVersioningStrategyOptions extends DefaultVersioningStrategyOptions { }

/**
 * This VersioningStrategy treats 'ftr' commits as minor version bumps,
 * otherwise it defers to the default strategy.
 */
export class SourceCustomVersioningStrategy extends DefaultVersioningStrategy {
  constructor(options: SourceCustomVersioningStrategyOptions = {}) {
    super(options);
    this.logger = options.logger ?? defaultLogger;
  }

  determineReleaseType(
    version: Version,
    commits: ConventionalCommit[]
  ): VersionUpdater {
    // Check for "RELEASE AS" notes first, as this should always take precedence
    for (const commit of commits) {
      const releaseAs = commit.notes.find(note => note.title === 'RELEASE AS');
      if (releaseAs) {
        this.logger.debug(
          `found Release-As: ${releaseAs.text}, forcing version`
        );
        return new CustomVersionUpdate(
          Version.parse(releaseAs.text).toString()
        );
      }
    }

    // Iterate through commits to find if there's an 'ftr' commit
    for (const commit of commits) {
      if (commit.type === 'ftr') {
        this.logger.debug(`Found 'ftr' commit, returning MinorVersionUpdate`);
        return new MinorVersionUpdate();
      }
    }

    // If no 'ftr' commit, and no "RELEASE AS" note,
    // defer to the default strategy's logic for other commit types (feat, fix, breaking)
    return super.determineReleaseType(version, commits);
  }
}
