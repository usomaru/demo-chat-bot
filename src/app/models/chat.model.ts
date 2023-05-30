export interface ReturnDataModel {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: usageModel;
    choices: choicesModel[];
  }

export interface usageModel {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface choicesModel {
    message: messageModel;
    finish_reason: string;
    index: number
}

export interface messageModel {
    role: string;
    content: string;
}