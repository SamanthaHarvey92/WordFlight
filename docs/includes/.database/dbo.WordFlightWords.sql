DROP TABLE IF EXISTS [dbo].[wordflightwords]

CREATE TABLE [dbo].[WordFlightWords]
(
	[word_id] INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
	[sponsor_id] INT NOT NULL,
	[word] VARCHAR(15) NOT NULL,
	CONSTRAINT FK_WordFlightWords_WordFlightSponsors
		FOREIGN KEY (sponsor_id)
		REFERENCES WordFlightSponsors (sponsor_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
)
