import { FunctionTemplateParameters, ContributionRequest } from 'amplify-function-plugin-interface';
import { templateRoot } from '../utils/constants';
import path from 'path';

const pathToTemplateFiles = path.join(templateRoot, 'lambda');

export function provideServerless(request: ContributionRequest): Promise<FunctionTemplateParameters> {
  const files = [
    '.gitignore',
    'Serverless/aws-lambda-tools-defaults.json.ejs',
    'Serverless/Function.csproj.ejs',
    'Serverless/FunctionHandler.cs.ejs',
    'Serverless/event.json.ejs',
  ];
  const handlerSource = path.join('src', `${request.contributionContext.functionName}.cs`);
  return Promise.resolve({
    functionTemplate: {
      sourceRoot: pathToTemplateFiles,
      sourceFiles: files,
      parameters: {
        path: '/item',
        expressPath: '/item',
      },
      defaultEditorFile: handlerSource,
      destMap: {
        '.gitignore': path.join('src', '.gitignore'),
        'Serverless/aws-lambda-tools-defaults.json.ejs': path.join('src', 'aws-lambda-tools-defaults.json'),
        'Serverless/Function.csproj.ejs': path.join('src', `${request.contributionContext.functionName}.csproj`),
        'Serverless/FunctionHandler.cs.ejs': handlerSource,
        'Serverless/event.json.ejs': path.join('src', 'event.json'),
      },
    },
  });
}
