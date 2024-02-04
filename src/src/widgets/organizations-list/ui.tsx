import { Avatar, Input, List, Select, Skeleton } from "antd";
import { RoutePaths } from "app/routing/route-paths";
import RouteService from "app/routing/route-service";
import moment from "moment";
import { Link } from "react-router-dom";
import { Organization } from "shared/api/typicode/models/organization";
import { OrganizationSortFields } from "shared/api/typicode/models/organization-sort-fields";
import { SearchCriteria } from "shared/api/typicode/search/search-criteria";
import { SearchResult } from "shared/api/typicode/search/search-result";
import {
  SortDirection,
  SortDirectionEnum,
} from "shared/api/typicode/search/sort-direction";
import { styled } from "styled-components";

interface Props {
  searchResult: SearchResult<Organization> | null;
  searchCriteria: SearchCriteria;
  updateSearchPaging: (page: number, pageSize: number) => void;
  updateSearchFilter: (fields: Record<string, string>) => void;
  updateSearchSorter: (fields: Record<string, SortDirection>) => void;
}
const OrganizationsList = ({
  searchResult,
  searchCriteria,
  updateSearchPaging,
  updateSearchFilter,
  updateSearchSorter,
}: Props) => {
  const pagination = {
    pageSize: searchCriteria.paging?.take,
    showSizeChanger: true,
    total: searchResult?.totalCount,
    current: searchCriteria.paging?.page,
    onChange: updateSearchPaging,
  };

  const renderOrganization = (item: Organization, index: number) => (
    <List.Item>
      <List.Item.Meta
        avatar={renderAvatar(index)}
        title={generateTitleLink(item)}
        description={renderOrganizationDescription(item)}
      />
    </List.Item>
  );

  const renderOrganizationDescription = (item: Organization) => {
    return (
      <CardDescriptionWrapper>
        <DescriptionWrapper>{item.description}</DescriptionWrapper>
        <CreatedAtWrapper>
          {moment(item.createdAt).format("DD.MM.YYYY")}
        </CreatedAtWrapper>
      </CardDescriptionWrapper>
    );
  };

  const renderAvatar = (index: number) => {
    return (
      <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
    );
  };

  const generateTitleLink = (organization: Organization) => {
    return (
      <Link
        to={RouteService.buildRoute(RoutePaths.Authenticated.Organization, {
          organizationId: organization.id,
        })}
      >
        {organization.name}
      </Link>
    );
  };

  const onSearch = (value: string) => {
    updateSearchFilter({ name: value });
  };

  const onSort = (key: string) => {
    const value = {
      [key.split("-")[0]]: key.split("-")[1] as SortDirectionEnum,
    };
    updateSearchSorter(value as Record<string, SortDirection>);
  };

  const selectedSorter = searchCriteria.sorter?.sortFields
    ? Object.entries(searchCriteria.sorter?.sortFields!).at(0)
    : undefined;

  const getSortOptions = () => {
    return [
      {
        value: `${OrganizationSortFields.Name}-${SortDirectionEnum.Ascending}`,
        label: "По названию (по возрастанию)",
      },
      {
        value: `${OrganizationSortFields.Name}-${SortDirectionEnum.Descending}`,
        label: "По названию (по убыванию)",
      },
      {
        value: `${OrganizationSortFields.CreatedAt}-${SortDirectionEnum.Ascending}`,
        label: "По дате создания (по возрастанию)",
      },
      {
        value: `${OrganizationSortFields.CreatedAt}-${SortDirectionEnum.Descending}`,
        label: "По дате создания (по убыванию)",
      },
    ];
  };

  return (
    <Skeleton active loading={searchResult === null}>
      <SearchWrapper>
        <SearchInputWrapper>
          <Input.Search
            placeholder="Поиск по организациям"
            onSearch={onSearch}
          />
        </SearchInputWrapper>
        <SorterWrapper>
          <Select
            style={{ width: "100%" }}
            options={getSortOptions()}
            value={
              selectedSorter
                ? `${selectedSorter[0]}-${selectedSorter[1]}`
                : undefined
            }
            placeholder={"Отсортировать"}
            onSelect={(key: string) => onSort(key)}
            onClear={() => updateSearchSorter({})}
            allowClear
          />
        </SorterWrapper>
      </SearchWrapper>
      <List
        pagination={pagination}
        dataSource={searchResult?.items}
        renderItem={renderOrganization}
      />
    </Skeleton>
  );
};

export default OrganizationsList;

const SearchWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 5px;
`;

const SearchInputWrapper = styled.div`
  flex: 85%;
`;

const SorterWrapper = styled.div`
  flex: 15%;
`;

const CardDescriptionWrapper = styled.div`
  display: flex;
  gap: "50%";
`;

const DescriptionWrapper = styled.div`
  width: 50%;
`;

const CreatedAtWrapper = styled.div`
  align-self: end;
  text-align: right;
  width: 50%;
`;
