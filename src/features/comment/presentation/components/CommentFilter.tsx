import DropdownMenu from "@src/shared/components/commons/DropdownMenu";
import { Flex } from "@src/shared/components/layouts";
import { useAppDispatch, useAppSelector } from "@src/shared/redux/hooks";
import { useMemo } from "react";
import { HiChevronDown } from "react-icons/hi";
import { CommentOrderBy } from "../../domain/comment.entity";
import { setOrderType } from "../slices/comment.slice";

export default function CommentFilter() {
  const dispatch = useAppDispatch();
  const { orderBy: orderType } = useAppSelector((state) => state.comment);

  const handleChangeOrderType = (type: CommentOrderBy) => {
    dispatch(setOrderType(type));
  };

  const menus = useMemo(
    () => [
      {
        id: CommentOrderBy.MOST_LIKED,
        label: "Most Like",
        onClick: () => handleChangeOrderType(CommentOrderBy.MOST_LIKED),
      },
      {
        id: CommentOrderBy.MOST_DISLIKED,
        label: "Most Dislike",
        onClick: () => handleChangeOrderType(CommentOrderBy.MOST_DISLIKED),
      },
      {
        id: CommentOrderBy.NEWEST,
        label: "Newest Comments",
        onClick: () => handleChangeOrderType(CommentOrderBy.NEWEST),
      },
    ],
    []
  );
  return (
    <Flex>
      <div></div>
      <DropdownMenu menus={menus}>
        <Flex>
          <span>
            {menus.find((menu) => menu.id === orderType)?.label ?? ""}
          </span>{" "}
          <HiChevronDown />
        </Flex>
      </DropdownMenu>
    </Flex>
  );
}
