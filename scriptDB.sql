USE [AuthenticationZigit]
GO
/****** Object:  Table [dbo].[PersonalDetails]    Script Date: 14/10/2023 22:44:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Team] [nvarchar](50) NOT NULL,
	[JoinedAt] [datetime] NOT NULL,
	[Avatar] [varchar](150) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_PersonalDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 14/10/2023 22:44:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[Id] [varchar](50) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Score] [int] NOT NULL,
	[DurationInDays] [int] NOT NULL,
	[BugsCount] [int] NOT NULL,
	[MadeDadeline] [bit] NOT NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 14/10/2023 22:44:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Password] [nchar](50) NOT NULL,
 CONSTRAINT [PK_User2] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PersonalDetails] ON 

INSERT [dbo].[PersonalDetails] ([Id], [Name], [Team], [JoinedAt], [Avatar], [UserId]) VALUES (1, N'Nofar Cohen Tanugi', N'Development', CAST(N'2023-01-01T00:00:00.000' AS DateTime), N'https://gravatar.com/avatar/7b2979fb035dfa5ada54dcd967164139?s=400&d=robohash&r=x', 1)
SET IDENTITY_INSERT [dbo].[PersonalDetails] OFF
GO
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b116fcfab7b78d350', N'Backend Project', 87, 41, 64, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b134a2003f8af1fd1', N'Backend Project', 82, 38, 47, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b173fda06ff170d73', N'Design Project', 87, 68, 56, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b474255e654c12d01', N'Backend Project', 79, 44, 72, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b532d8c6fbb42889c', N'Design Project', 100, 39, 47, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b59b3068480a70fa9', N'Backend Project', 99, 37, 65, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b729e99d31e89abe1', N'Fullstack Project', 77, 67, 74, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b760c9a63057d2aa2', N'Design Project', 65, 60, 59, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b7de958c3143892e8', N'Design Project', 95, 59, 65, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b7f8236b00b4af7d2', N'Backend Project', 98, 38, 75, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b85de8839957a723b', N'Backend Project', 97, 66, 64, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b86effeab4fadae71', N'Fullstack Project', 71, 66, 33, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b899dd436c5604120', N'Backend Project', 90, 36, 34, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b9123837114b6e5d7', N'Fullstack Project', 94, 65, 75, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b97e765bfc40b0e64', N'Frontend Project', 99, 51, 32, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b9937c7bcd60c4bc5', N'Design Project', 68, 55, 52, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b9cbcef501edc3282', N'Design Project', 97, 68, 42, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953b9ea8b81780d1f3a8', N'Design Project', 88, 72, 52, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953ba9d2809ab8b0309a', N'Frontend Project', 75, 38, 43, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bb533633938e96aea', N'Frontend Project', 90, 60, 40, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bc5829fab66d03568', N'Design Project', 89, 53, 57, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bc9bba25271a8044f', N'Frontend Project', 91, 37, 38, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bd1e1af04d1f33851', N'Fullstack Project', 73, 58, 62, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bd75d55e63433cc43', N'Fullstack Project', 76, 36, 73, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bd98214b6df37174d', N'Backend Project', 88, 35, 74, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bdd09075f059e527c', N'Backend Project', 91, 53, 50, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953be15e723483509f48', N'Backend Project', 84, 37, 57, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953be21cbfc5e2384c0a', N'Fullstack Project', 79, 61, 63, 1, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953be4392e46fe106df2', N'Backend Project', 93, 66, 72, 0, NULL)
INSERT [dbo].[Project] ([Id], [Name], [Score], [DurationInDays], [BugsCount], [MadeDadeline], [UserId]) VALUES (N'5fb9953bee0839034e07a1e9', N'Backend Project', 66, 62, 50, 1, NULL)
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([Id], [Email], [Password]) VALUES (1, N'nofar@gmail.com', N'A1234567                                          ')
SET IDENTITY_INSERT [dbo].[User] OFF
GO
ALTER TABLE [dbo].[PersonalDetails]  WITH CHECK ADD  CONSTRAINT [FK_PersonalDetails_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[PersonalDetails] CHECK CONSTRAINT [FK_PersonalDetails_User]
GO
ALTER TABLE [dbo].[Project]  WITH CHECK ADD  CONSTRAINT [FK_Project_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[Project] CHECK CONSTRAINT [FK_Project_User]
GO
