type BaseResponse = {
  exception: null | string;
  messages: string[];
  resultType: number;
};

export type BackResponse<T> = (
  | {
      data: T;
      isSuccessTypeResult: true;
    }
  | {
      data: null;
      isSuccessTypeResult: false;
    }
) &
  BaseResponse;
